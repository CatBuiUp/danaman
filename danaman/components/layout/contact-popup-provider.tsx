"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

import { AboutDanamanPopup } from "@/components/layout/about-danaman-popup";
import { ContactPopup } from "@/components/layout/contact-popup";

type ContactPopupContextValue = {
  openContactPopup: () => void;
  closeContactPopup: () => void;
  openAboutDanamanPopup: () => void;
  closeAboutDanamanPopup: () => void;
};

const ContactPopupContext = createContext<ContactPopupContextValue | null>(null);

export function useContactPopup() {
  const context = useContext(ContactPopupContext);
  if (!context) {
    throw new Error("useContactPopup must be used within ContactPopupProvider");
  }
  return context;
}

export function ContactPopupProvider({ children }: { children: ReactNode }) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const openContactPopup = useCallback(() => setIsContactOpen(true), []);
  const closeContactPopup = useCallback(() => setIsContactOpen(false), []);
  const openAboutDanamanPopup = useCallback(() => setIsAboutOpen(true), []);
  const closeAboutDanamanPopup = useCallback(() => setIsAboutOpen(false), []);

  return (
    <ContactPopupContext.Provider
      value={{
        openContactPopup,
        closeContactPopup,
        openAboutDanamanPopup,
        closeAboutDanamanPopup,
      }}
    >
      {children}
      <ContactPopup isOpen={isContactOpen} onClose={closeContactPopup} />
      <AboutDanamanPopup isOpen={isAboutOpen} onClose={closeAboutDanamanPopup} />
    </ContactPopupContext.Provider>
  );
}
