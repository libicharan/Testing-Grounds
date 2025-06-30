"use client";

import React, { useEffect, useState } from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import { useRouter } from "next/navigation";
import type { MenuItem } from "primereact/menuitem";

type Props = {
  items: MenuItem[];
  showHome?: boolean;
  Title?: string;
};

const CustomBreadcrumb: React.FC<Props> = ({
  Title,
  items,
  showHome = true,
}) => {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const home: MenuItem = {
    icon: "pi pi-home",
    command: () => {
      router.push("/");
    },
  };

  return (
    <div
      className={`
        mb-4 bg-white border rounded border-[#bababa] p-6
        min-h-[64px] overflow-hidden
        flex items-center justify-between
        ${hydrated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
    >
      <p className="text-black text-base p-3">{Title}</p>

      <div
        className={`    
          flex items-center
          ${hydrated ? "justify-end opacity-100" : "justify-center opacity-0"}
          min-w-[250px]
        `}
      >
        {hydrated ? (
          <BreadCrumb model={items} home={showHome ? home : undefined} />
        ) : (
          <div className="w-[200px] h-[24px] bg-gray-200 rounded" />
        )}
      </div>
    </div>
  );
};

export default CustomBreadcrumb;
