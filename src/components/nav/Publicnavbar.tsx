import React from 'react';
import CardNav from '../../components/reactbits/CardNav';


const PublicNavbar = () => {
  const items = [
    {
      label: "Features",
      bgColor: "#1a1a1a",
      textColor: "#fff",
      links: [
        { label: "Credit Tracking", href: "#credit-tracking", ariaLabel: "Credit Tracking Features" },
        { label: "Blockchain Verification", href: "#verification", ariaLabel: "Blockchain Verification" },
        { label: "Analytics Dashboard", href: "#analytics", ariaLabel: "Analytics Dashboard" },
        { label: "Smart Contracts", href: "#contracts", ariaLabel: "Smart Contracts" }
      ]
    },
    {
      label: "How it Works", 
      bgColor: "#2a2a2a",
      textColor: "#fff",
      links: [
        { label: "Issue Credits", href: "#issue", ariaLabel: "How to Issue Credits" },
        { label: "Track & Verify", href: "#track", ariaLabel: "Track and Verify Process" },
        { label: "Retire Credits", href: "#retire", ariaLabel: "Retire Credits Process" },
        { label: "Audit Trail", href: "#audit", ariaLabel: "Audit Trail Documentation" }
      ]
    },
    {
      label: "Resources",
      bgColor: "#0a0a0a", 
      textColor: "#fff",
      links: [
        { label: "Documentation", href: "/docs", ariaLabel: "Platform Documentation" },
        { label: "API Reference", href: "/api", ariaLabel: "API Reference" },
        { label: "Case Studies", href: "/case-studies", ariaLabel: "Case Studies" },
        { label: "White Paper", href: "/whitepaper", ariaLabel: "Technical White Paper" }
      ]
    }
  ];

  return (
    <CardNav
      logo=""
      logoAlt=""
      items={items}
      baseColor="#0F172A"
      menuColor="#14532D"
      buttonBgColor="#fff"
      buttonTextColor="#000"
      ease="power3.out"
    />
  );
};

export default PublicNavbar;