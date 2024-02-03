import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const getRandomImageUrl = async () => {
    const response = await fetch('https://source.unsplash.com/random/800x600');
    const imageUrl = response.url;
    return imageUrl;
};
export const initialProfile = async (id: string) => {

    const profile = await db.profile.findUnique({
        where: {
            userId: id
        }
    });

    if (profile) {
        return profile;
    }

    const userInfo = await db.user.findUnique({
        where: {
            id: Number(id)
        },
        select: {
            displayName: true,
            email: true
        }
    })

    if (!userInfo) {
        redirect('/login');
    }
    // Fetch a random image URL from Unsplash
    const imageUrl = await getRandomImageUrl();
    const { displayName, email } = userInfo;
    const newProfile = await db.profile.create({
        data: {
            userId: id,
            name: displayName,
            imageUrl: imageUrl,
            email: email
        }
    });

    return newProfile;
};