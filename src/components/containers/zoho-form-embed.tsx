import React, { useEffect } from "react";

interface ZohoFormEmbedProps {
    className?: string;
}

const ZohoFormEmbed: React.FC<ZohoFormEmbedProps> = ({ className = "" }) => {
    useEffect(() => {
        // Create script element
        const script = document.createElement("script");
        script.src = "https://forms.zohopublic.com/tcco1/jsperma/ctTKZRyqMG-fs-qK4SiqJ6bACdvbRxpW9GoETdY_JmU";
        script.async = true;
        script.defer = true;

        // Append script to document
        document.body.appendChild(script);

        // Clean up function to remove script when component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className={`zoho-form-container ${className}`}>
            <div id="zf_div_ctTKZRyqMG-fs-qK4SiqJ6bACdvbRxpW9GoETdY_JmU">
                {/* Zoho form will be loaded here */}
                <iframe
                    name="zf_widget_ctTKZRyqMG-fs-qK4SiqJ6bACdvbRxpW9GoETdY_JmU"
                    id="zf_widget_ctTKZRyqMG-fs-qK4SiqJ6bACdvbRxpW9GoETdY_JmU"
                    title="TCCo. Contact Form"
                    width="100%"
                    height="600px"
                    frameBorder="0"
                    src="https://forms.zohopublic.com/tcco1/form/tcco/formperma/ctTKZRyqMG-fs-qK4SiqJ6bACdvbRxpW9GoETdY_JmU"
                ></iframe>
            </div>
        </div>
    );
};

export default ZohoFormEmbed; 