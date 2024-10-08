"use client"

import { createClient } from "@/supabase/client";

export default async function AddUserToSupabase(user: any, isSignedIn: boolean) {
    const supabase = createClient()

    const newUser = {
        id: user?.id,
        email: user?.emailAddresses[0].emailAddress,
        fullname: user?.fullName
    };

    console.log("newUser", newUser);


    const { data, error } = await supabase
        .from('Users')
        .select('id')
        .eq("id", user?.id);

    if (error) {
        console.error('Error fetching user exist data:', error);
    } else {
        if (!data.length) {
            try {
                const { error } = await supabase
                    .from('Users')
                    .insert(newUser);
                if (error) {
                    console.log("error adding user: ", error);
                }
            } catch (error) {
                console.log("error adding user: ", error);
            }
        }
    }

    return <></>
}
