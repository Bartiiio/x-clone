"use client";

import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import Modal from "../Modal";
import Input from "../Input";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";

function LoginModal() {
   const loginModal = useLoginModal();
   const registerModal = useRegisterModal();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   const onToogle = useCallback(() => {
      if (isLoading) return;
      loginModal.onClose();
      registerModal.onOpen();
   }, [isLoading, registerModal, loginModal]);

   const onSubmit = useCallback(async () => {
      try {
         setIsLoading(true);

         await signIn("credentials", {
            email,
            password,
         });

         loginModal.onClose();
      } catch (error) {
         console.log(error);
      } finally {
         setIsLoading(false);
      }
   }, [loginModal, email, password]);
   const bodyContent = (
      <div className="flex flex-col gap-4">
         <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={isLoading}
         />
         <Input
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            disabled={isLoading}
         />
      </div>
   );

   const footerContent = (
      <div className="text-neutral-400 text-center mt-4">
         <p>
            First time using X?
            <span
               onClick={onToogle}
               className="text-white cursor-pointer hover:underline"
            >
               {" "}
               Create an account
            </span>
         </p>
      </div>
   );

   return (
      <Modal
         onSubmit={onSubmit}
         disabled={isLoading}
         isOpen={loginModal.isOpen}
         title="Login"
         actionLabel="Sign in"
         onClose={loginModal.onClose}
         body={bodyContent}
         footer={footerContent}
      />
   );
}

export default LoginModal;