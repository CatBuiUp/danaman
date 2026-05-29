"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

import { ContactPopup } from "@/components/layout/contact-popup";

type ContactPopupContextValue = {
  openContactPopup: () => void;
  closeContactPopup: () => void;
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
  const [isOpen, setIsOpen] = useState(false);
  const openContactPopup = useCallback(() => setIsOpen(true), []);
  const closeContactPopup = useCallback(() => setIsOpen(false), []);

  return (
    <ContactPopupContext.Provider value={{ openContactPopup, closeContactPopup }}>
      {children}
      <ContactPopup isOpen={isOpen} onClose={closeContactPopup} />
    </ContactPopupContext.Provider>
  );
}
