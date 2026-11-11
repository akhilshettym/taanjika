// "use client";

// import Link from "next/link";
// import { UserRound } from "lucide-react";
// import { CustomButton } from "@/components/ui/CustomButton";

// type AccountActionsProps = {
//   isAuthenticated?: boolean;
// };

// export function AccountActions({ isAuthenticated = false }: AccountActionsProps) {
//   if (isAuthenticated) {
//     return (
//       <Link
//         href="/account"
//         className="text-typo-primary hover:text-brand-primary flex items-center gap-2 text-sm font-medium transition-colors"
//       >
//         <UserRound size={20} className="shrink-0" aria-hidden="true" />
//         <span>My Account</span>
//       </Link>
//     );
//   }

//   return (
//     <div className="group relative inline-block">
//       <Link
//         href="/sign-in"
//         className="text-typo-primary hover:text-brand-primary flex items-center gap-2.5 text-xs transition-colors focus-visible:outline-none"
//       >
//         <UserRound
//           size={22}
//           className="shrink-0 transition-transform duration-200 group-hover:scale-105"
//           aria-hidden="true"
//         />
//         <div className="flex flex-col text-left leading-tight font-medium">
//           <span className="whitespace-nowrap">Sign in /</span>
//           <span className="font-semibold whitespace-nowrap">Register</span>
//         </div>
//       </Link>

//       <div className="invisible absolute top-full right-0 z-50 pt-3 opacity-0 transition-all duration-200 ease-out group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
//         <div className="bg-surface-secondary w-80 translate-y-1 transform rounded-md border border-(--border-primary,#741f2b)/20 p-5 shadow-2xl backdrop-blur-sm transition-all group-hover:translate-y-0">
//           <div className="text-typo-utility flex flex-col items-stretch text-center">
//             <CustomButton href="/sign-in" variant="default" className="w-full uppercase">
//               Sign In
//             </CustomButton>
//             <p className="text-typo-secondary text-[10px]">
//               Access your saved artworks and order tracking
//             </p>
//           </div>

//           <div className="relative my-5 flex items-center justify-center">
//             <div className="w-full border-t-2 border-(--border-primary,#741f2b)" />
//             <span className="bg-surface-secondary text-typo-secondary/80 absolute px-3 text-[10px] font-bold tracking-widest uppercase">
//               New Customer?
//             </span>
//           </div>

//           <div className="text-typo-utility flex flex-col items-stretch text-center">
//             <CustomButton href="/register" variant="default" className="w-full uppercase">
//               Create Account
//             </CustomButton>
//             <p className="text-typo-secondary text-[11px]">
//               Enjoy exclusive access, curated for you.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import Image from "next/image";
import { UserRound } from "lucide-react";
import { CustomButton } from "@/components/ui/CustomButton";

type AccountActionsProps = {
  isAuthenticated?: boolean;
};

export function AccountActions({ isAuthenticated = false }: AccountActionsProps) {
  if (isAuthenticated) {
    return (
      <Link
        href="/account"
        className="text-typo-primary hover:text-brand-primary flex items-center gap-2 text-sm font-medium transition-colors"
      >
        <UserRound size={20} className="shrink-0" aria-hidden="true" />
        <span>My Account</span>
      </Link>
    );
  }

  return (
    <div className="group relative inline-block">
      <Link
        href="/sign-in"
        className="text-typo-primary hover:text-brand-primary flex items-center gap-2.5 text-xs transition-colors focus-visible:outline-none"
      >
        <UserRound
          size={22}
          className="shrink-0 transition-transform duration-200 group-hover:scale-105"
          aria-hidden="true"
        />
        <div className="flex flex-col text-left leading-tight font-medium">
          <span className="whitespace-nowrap">Sign in /</span>
          <span className="font-semibold whitespace-nowrap">Register</span>
        </div>
      </Link>

      <div className="invisible absolute top-full right-0 z-50 pt-3 opacity-0 transition-all duration-200 ease-out group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <div className="bg-surface-secondary w-80 translate-y-1 transform rounded-md border border-(--border-primary,#741f2b)/20 p-5 shadow-2xl backdrop-blur-sm transition-all group-hover:translate-y-0">
          <div className="text-typo-utility flex flex-col items-stretch text-center">
            <CustomButton href="/sign-in" variant="default" className="w-full uppercase">
              Sign In
            </CustomButton>
            <p className="text-typo-secondary text-[10px]">
              Access your saved artworks and order tracking
            </p>
          </div>

          <div className="my-5 flex items-center justify-between gap-2">
            <Image
              src="/auth/signin-right.png"
              alt=""
              width={826}
              height={302}
              sizes="80px"
              style={{ width: "80px", height: "auto" }}
              className="shrink-0 object-contain"
            />
            <span className="text-typo-secondary/80 shrink-0 text-[10px] font-bold tracking-widest uppercase">
              New Customer?
            </span>
            <Image
              src="/auth/signin-left.png"
              alt=""
              width={826}
              height={302}
              sizes="80px"
              style={{ width: "80px", height: "auto" }}
              className="shrink-0 object-contain"
            />
          </div>

          <div className="text-typo-utility flex flex-col items-stretch text-center">
            <CustomButton href="/register" variant="default" className="w-full uppercase">
              Create Account
            </CustomButton>
            <p className="text-typo-secondary text-[11px]">
              Enjoy exclusive access, curated for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
