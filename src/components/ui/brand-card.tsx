import Image from "next/image";
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface BrandCardProps {
  imageUrl: string;
  heading: string;
  bodyText: string;
  learnMoreLink: string;
  subHeading: string;
  className?: string;
  alignImageRight?: boolean;
}

export const BrandCard: React.FC<BrandCardProps> = ({
  imageUrl,
  heading,
  bodyText,
  learnMoreLink,
  className,
  subHeading,
  alignImageRight = false,
}) => {
  return (
    <Card
      className={cn(
        "flex flex-col md:flex-row h-full w-full overflow-hidden border-primary bg-background shadow-custom-rem p-6 rounded-sm",
        className
      )}
    >
      <div className="w-full h-[220px] mb-6 md:mb-0 p-2 md:w-2/5 md:h-full relative">
        <Image
          layout="fill"
          objectFit="cover"
          objectPosition={alignImageRight ? "right" : ""}
          src={imageUrl}
          alt={heading}
          className="w-full"
        />
      </div>
      <div className="w-full md:w-3/5 pl-0 md:pl-6 flex flex-col">
        <div>
          <h2 className="text-xl uppercase font-display mb-2">{heading}</h2>
          <h4 className="text-base font-display">{subHeading}</h4>
          <p className="my-6 text-sm">{bodyText}</p>
        </div>
        <Button asChild variant="outline" size="lg" className="self-start">
          <Link href={learnMoreLink}>Learn More</Link>
        </Button>
      </div>
    </Card>
  );
};
