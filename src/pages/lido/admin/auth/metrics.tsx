import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import {
    collection,
    doc,
    getDoc,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { firestore, METRICS_COLLECTION, METRICS_DOCUMENT_ID } from "@/lib/firebase";
import { AuthWrapper } from "@/components/admin/auth-wrapper";

// Define the metrics schema
interface Metric {
    id: string;
    name: string;
    value: string;
    suffix: string;
}

interface MetricsData {
    websiteVisitors: Metric;
    connections: Metric;
    monthsOperating: Metric;
    smbs: Metric;
}

// Define the form schema
const metricSchema = yup.object({
    value: yup.string().required("Value is required"),
    suffix: yup.string().optional(),
});

export default function MetricsPage() {
    const [metrics, setMetrics] = useState<MetricsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [editingMetric, setEditingMetric] = useState<string | null>(null);
    const [saveStatus, setSaveStatus] = useState<{
        id: string;
        status: "idle" | "saving" | "success" | "error";
        message?: string;
    }>({ id: "", status: "idle" });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        resolver: yupResolver(metricSchema),
    });

    useEffect(() => {
        // Fetch metrics from Firestore
        const fetchMetrics = async () => {
            try {
                const metricsRef = doc(firestore, METRICS_COLLECTION, METRICS_DOCUMENT_ID);
                const metricsSnapshot = await getDoc(metricsRef);

                if (metricsSnapshot.exists()) {
                    setMetrics(metricsSnapshot.data() as MetricsData);
                } else {
                    // Create default metrics if they don't exist
                    const defaultMetrics: MetricsData = {
                        websiteVisitors: {
                            id: "websiteVisitors",
                            name: "Website Visitors",
                            value: "1",
                            suffix: "m+",
                        },
                        connections: {
                            id: "connections",
                            name: "Connections",
                            value: "12",
                            suffix: "k+",
                        },
                        monthsOperating: {
                            id: "monthsOperating",
                            name: "Months Operating",
                            value: "14",
                            suffix: "+",
                        },
                        smbs: {
                            id: "smbs",
                            name: "SMBs",
                            value: "50",
                            suffix: "+",
                        },
                    };

                    await setDoc(metricsRef, defaultMetrics);
                    setMetrics(defaultMetrics);
                }
            } catch (error) {
                console.error("Error fetching metrics:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMetrics();
    }, []);

    const handleEditMetric = (metricId: string) => {
        if (!metrics) return;

        const metric = metrics[metricId as keyof MetricsData];
        setValue("value", metric.value);
        setValue("suffix", metric.suffix);
        setEditingMetric(metricId);
    };

    const handleCancelEdit = () => {
        setEditingMetric(null);
        reset();
    };

    const onSubmit = async (data: { value: string; suffix?: string }) => {
        if (!editingMetric || !metrics) return;

        setSaveStatus({ id: editingMetric, status: "saving" });

        try {
            const updatedMetrics = {
                ...metrics,
                [editingMetric]: {
                    ...metrics[editingMetric as keyof MetricsData],
                    value: data.value,
                    suffix: data.suffix ? data.suffix : "",
                },
            };

            const metricsRef = doc(firestore, METRICS_COLLECTION, METRICS_DOCUMENT_ID);
            await updateDoc(metricsRef, updatedMetrics);

            setMetrics(updatedMetrics);
            setSaveStatus({
                id: editingMetric,
                status: "success",
                message: "Saved successfully"
            });

            // Reset form after successful save
            setTimeout(() => {
                setSaveStatus({ id: "", status: "idle" });
                setEditingMetric(null);
                reset();
            }, 2000);
        } catch (error) {
            console.error("Error updating metric:", error);
            setSaveStatus({
                id: editingMetric,
                status: "error",
                message: "Failed to save"
            });
        }
    };

    if (isLoading) {
        return (
            <AuthWrapper title="Impact Metrics">
                <div className="flex justify-center">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            </AuthWrapper>
        );
    }

    return (
        <AuthWrapper title="Impact Metrics">
            <div className="mb-8">
                <h1 className="text-2xl font-display">Impact Metrics Management</h1>
                <p className="text-gray-400 mt-2">
                    Update the impact numbers displayed on the website
                </p>
            </div>

            <div className="rounded-md border p-6">
                <div className="grid gap-6 md:grid-cols-2">
                    {metrics && Object.entries(metrics).map(([id, metric]) => (
                        <div key={id} className="rounded-md border p-4">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-medium">{metric.name}</h3>
                                    {editingMetric !== id && (
                                        <div className="mt-2 text-2xl font-semibold">
                                            {metric.value}
                                            <span className="text-primary">{metric.suffix}</span>
                                        </div>
                                    )}
                                </div>
                                {editingMetric !== id ? (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEditMetric(id)}
                                    >
                                        Edit
                                    </Button>
                                ) : null}
                            </div>

                            {editingMetric === id && (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1">
                                            <label className="text-sm font-medium">Value</label>
                                            <input
                                                {...register("value")}
                                                className="rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                                                placeholder="Enter value"
                                            />
                                            {errors.value && (
                                                <span className="text-sm text-red-500">
                                                    {errors.value.message}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-sm font-medium">Suffix</label>
                                            <input
                                                {...register("suffix")}
                                                className="rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                                                placeholder="Enter suffix (e.g., k+, m+)"
                                            />
                                            {errors.suffix && (
                                                <span className="text-sm text-red-500">
                                                    {errors.suffix.message}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="outline"
                                            type="button"
                                            onClick={handleCancelEdit}
                                            disabled={saveStatus.status === "saving"}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={saveStatus.status === "saving"}
                                        >
                                            {saveStatus.status === "saving" ? "Saving..." : "Save"}
                                        </Button>
                                    </div>

                                    {saveStatus.id === id && saveStatus.status === "success" && (
                                        <div className="text-sm text-green-500 mt-2">
                                            {saveStatus.message}
                                        </div>
                                    )}

                                    {saveStatus.id === id && saveStatus.status === "error" && (
                                        <div className="text-sm text-red-500 mt-2">
                                            {saveStatus.message}
                                        </div>
                                    )}
                                </form>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </AuthWrapper>
    );
} 