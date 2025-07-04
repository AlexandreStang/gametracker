"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {signIn} from "next-auth/react";
import styles from "@/styles/modules/auth/auth.module.css";
import clsx from "clsx";
import FormItem from "@/ui/form/formItem";
import Button from "@/ui/button/button";

export default function SignUpPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.target;
        if (!(form instanceof HTMLFormElement)) {
            console.error("Form element not found.");
            return;
        }

        const formData = new FormData(form);
        console.log("Form entries:", [...formData.entries()]);

        const signInResult = await signIn("credentials", {
            ...Object.fromEntries(formData),
            redirect: false,
        });

        if (signInResult?.error) {
            setError("Failed to sign in after registration");
            return;
        }

        router.push("/");
        router.refresh();
    }

    return (
        <div className={styles.auth_page}>
            <div className={styles.auth_container}>
                <div>
                    <h2 className={clsx("app_heading_2", styles.auth_heading)}>
                        Create your account
                    </h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.auth_form_items}>
                        <FormItem label={"Name"} htmlFor={"name"}>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className={"app_input"}
                            />
                        </FormItem>

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
                            Sign up
                        </Button>
                    </div>
                </form>
                <div className={styles.auth_centered}>
                    <Link href="/login" className={"app_link_inline"}>
                        Already have an account? Sign in.
                    </Link>
                </div>
            </div>
        </div>
    );
}
