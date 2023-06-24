"use client";

import React, { useEffect, useState } from "react";

interface Props {
  children: JSX.Element | null;
}

const Client = ({ children }: Props) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return children;
};

export default Client;

export const withClient = (Component: () => JSX.Element) => {
  const ClientOnly = () => (
    <Client>
      <Component />
    </Client>
  );
  return ClientOnly;
};
