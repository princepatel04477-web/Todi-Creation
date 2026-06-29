import React from "react";

export interface SEOJsonLdProps {
  /**
   * Whether to render the Organization schema.
   */
  renderOrganization?: boolean;
  /**
   * Whether to render the Local Business schema.
   */
  renderLocalBusiness?: boolean;
  /**
   * Custom product data to render the Product schema.
   */
  productData?: {
    title: string;
    description: string;
    images: string[];
    sku: string;
    price: number;
    category?: string;
    fabric?: string;
    inStock: boolean;
    url?: string;
  };
  /**
   * Custom override for Organization Name.
   */
  organizationName?: string;
  /**
   * Custom override for Logo URL.
   */
  logoUrl?: string;
  /**
   * Custom override for Domain URL.
   */
  domainUrl?: string;
  /**
   * Custom override for Telephone number.
   */
  telephone?: string;
  /**
   * Custom override for Address.
   */
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
}

/**
 * SEOJsonLd renders structured JSON-LD data for search engines.
 * It supports Organization, Local Business, and Product schemas.
 * XSS Security: JSON strings are sanitized using the recommended Next.js method.
 */
export default function SEOJsonLd({
  renderOrganization = false,
  renderLocalBusiness = false,
  productData,
  organizationName = "Todi Creation",
  logoUrl = "https://todicreation.com/logo.png",
  domainUrl = "https://todicreation.com",
  telephone = "+91-99999-99999",
  address = {
    streetAddress: "Ring Road",
    addressLocality: "Surat",
    addressRegion: "Gujarat",
    postalCode: "395002",
    addressCountry: "IN",
  },
}: SEOJsonLdProps) {
  const schemas: Record<string, any>[] = [];

  // 1. Organization Schema
  if (renderOrganization) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${domainUrl}/#organization`,
      name: organizationName,
      url: domainUrl,
      logo: logoUrl,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: telephone,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
    });
  }

  // 2. Local Business Schema (Todi Creation's Surat-based ethnic wear manufacturing business)
  if (renderLocalBusiness) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${domainUrl}/#localbusiness`,
      name: organizationName,
      image: logoUrl,
      url: domainUrl,
      telephone: telephone,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: address.streetAddress || "Ring Road",
        addressLocality: address.addressLocality || "Surat",
        addressRegion: address.addressRegion || "Gujarat",
        postalCode: address.postalCode || "395002",
        addressCountry: address.addressCountry || "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 21.1702,
        longitude: 72.8311,
      },
    });
  }

  // 3. Product Schema
  if (productData) {
    const productSchema: Record<string, any> = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: productData.title,
      image: productData.images,
      description: productData.description,
      sku: productData.sku,
      offers: {
        "@type": "Offer",
        url: productData.url || domainUrl,
        priceCurrency: "INR",
        price: productData.price,
        priceValidUntil: new Date(new Date().getFullYear() + 1, 11, 31)
          .toISOString()
          .split("T")[0], // Valid until end of next year
        itemCondition: "https://schema.org/NewCondition",
        availability: productData.inStock
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        seller: {
          "@type": "Organization",
          name: organizationName,
        },
      },
    };

    if (productData.category) {
      productSchema.category = productData.category;
    }
    if (productData.fabric) {
      productSchema.material = productData.fabric;
    }

    schemas.push(productSchema);
  }

  if (schemas.length === 0) {
    return null;
  }

  return (
    <>
      {schemas.map((schema, index) => {
        const jsonString = JSON.stringify(schema);
        // Next.js recommended sanitize method to prevent XSS:
        const sanitizedJson = jsonString.replace(/</g, "\\u003c");

        return (
          <script
            key={`${schema["@type"]}-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: sanitizedJson }}
          />
        );
      })}
    </>
  );
}
