"use client"

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@/supabase/client";

export default function AddUserToSupabase() {
    const { user } = useUser();
    const supabase = createClient()
    const [signup, setSignUp] = useState(false)

    useEffect(() => {
        if (user) {
            const userCreatedAt = user.createdAt ? new Date(user.createdAt) : null;
            if (userCreatedAt) {
                const now = new Date();
                const timeDifference = Math.abs(now.getTime() - userCreatedAt.getTime());
                const signupThreshold = 7 * 1000;
                const isFirstSignUp = timeDifference < signupThreshold;
                setSignUp(isFirstSignUp);
                console.log("isFirstSignUp: ", isFirstSignUp);
            }
        }
    }, [user]);

    const addUser = async () => {
        const createdAt = user?.createdAt ? new Date(user.createdAt) : new Date();
        const newUser = {
            id: user?.id,
            email: user?.emailAddresses[0].emailAddress,
            fullname: user?.fullName,
            created_at: createdAt
        }
        try {
            const { error } = await supabase
                .from('Users')
                .insert(newUser)
            if (error) {
                console.log(error);
            }
        } catch (error) {
            console.log("error: ", error);
        }
    }

    if (signup) {
        addUser()
    }

}
