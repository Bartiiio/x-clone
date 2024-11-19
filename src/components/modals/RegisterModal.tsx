"use client";
import axios from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";

import Modal from "../Modal";
import Input from "../Input";

function RegisterModal() {
   const registerModal = useRegisterModal();
   const loginModal = useLoginModal();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [name, setName] = useState("");
   const [username, setUsername] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   const onToogle = useCallback(() => {
      if (isLoading) return;
      registerModal.onClose();
      loginModal.onOpen();
   }, [isLoading, registerModal, loginModal]);

   const onSubmit = useCallback(async () => {
      try {
         setIsLoading(true);

         await axios.post("/api/register", {
            email,
            password,
            username,
            name,
         });

         toast.success("Account created.");

         signIn("credentials", {
            email,
            password,
         });

         registerModal.onClose();
      } catch (error) {
         console.log(error);
         toast.error("Something went wrong!");
      } finally {
         setIsLoading(false);
      }
   }, [registerModal, email, name, password, username]);

   const bodyContent = (
      <div className="flex flex-col gap-4">
         <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            disabled={isLoading}
         />
         <Input
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            disabled={isLoading}
         />
         <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
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
            Already have an account?
            <span
               onClick={onToogle}
               className="text-white cursor-pointer hover:underline"
            >
               {" "}
               Sign in
            </span>
         </p>
      </div>
   );

   return (
      <Modal
         onSubmit={onSubmit}
         disabled={isLoading}
         isOpen={registerModal.isOpen}
         title="Create an account"
         actionLabel="Register"
         onClose={registerModal.onClose}
         body={bodyContent}
         footer={footerContent}
      />
   );
}

export default RegisterModal;
