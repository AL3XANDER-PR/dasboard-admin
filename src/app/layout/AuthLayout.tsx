// src/app/layout/AuthLayout.tsx

import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="bg-muted relative hidden lg:block">
        <div className="z-10 absolute top-9 left-9 flex justify-center gap-2 md:justify-start">
          <a
            href="#"
            className="flex items-center gap-2 font-medium text-accent dark:bg-transparent dark:text-accent-foreground bg-foreground/30 p-2 rounded-2xl"
          >
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              {/* <GalleryVerticalEnd className="size-4" /> */}
              {/* <DarkModeToggle /> */}
            </div>
            <span className="">Acme Inc.</span>
          </a>
        </div>
        <img
          src="https://images.pexels.com/photos/6752422/pexels-photo-6752422.jpeg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start lg:hidden">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              {/* <DarkModeToggle /> */}
            </div>
            <span className="text-accent-foreground">Acme Inc.</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
