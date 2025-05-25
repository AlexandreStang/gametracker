"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import FormItem from "@/ui/form/formItem";
import styles from "@/styles/modules/auth/auth.module.css";
import clsx from "clsx";
import Button from "@/ui/button/button";

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const response = await signIn("credentials", {
                ...Object.fromEntries(formData),
                redirect: false,
            });

            if (response?.error) {
                setError("Invalid credentials");
                return;
            }

            router.push("/");
            router.refresh();
        } catch {
            setError("An error occurred during login");
        }
    }

    return (
        <div className={styles.auth_page}>
            <div className={styles.auth_container}>
                <div>
                    <h2 className={clsx("app_heading_2", styles.auth_heading)}>
                        Log in to your account
                    </h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.auth_form_items}>
                        <FormItem label={"Email address"} htmlFor={"email"}>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className={"app_input"}
                            />
                        </FormItem>

                        <FormItem label={"Password"} htmlFor={"password"}>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className={"app_input"}
                            />
                        </FormItem>
                    </div>

                    {error && (
                        <div className={clsx("app_body_error", styles.auth_centered, styles.auth_margin)}>{error}</div>
                    )}

                    <div className={clsx(styles.auth_margin, styles.auth_centered)}>
                        <Button type={"submit"}>
                            Log In
                        </Button>
                    </div>
                </form>
                <div className={styles.auth_centered}>
                    <Link href="/signup" className={"app_link_inline"}>
                        No account? Register.
                    </Link>
                </div>
            </div>
        </div>
    );
}
