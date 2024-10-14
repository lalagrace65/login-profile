'use client';
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label"

export default function ProfilePage() {
    const session = useSession();
    const [userName, setUserName] = useState('');
    const [saved, setSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const {status} = session;
    const { toast } = useToast()

      useEffect(() => {
        if (status === 'authenticated') {
          setUserName(session.data.user.name);
        }
      }, [session, status]);

    async function handleProfileInfoUpdate(ev){
      ev.preventDefault();
      setSaved(false);
      setIsSaving(true);
      const response =  await fetch('/api/profile', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name:userName}),
      });
      setIsSaving(false);
      if (response.ok) {
        toast({
          description: "Your profile has been updated",
        })
      }
    }


  if (status === 'loading') {
    return 'Loading...';
  }

  if (status === 'unauthenticated') {
    return redirect('/login');
  }

const userImage = session.data.user.image;

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">
        Profile
      </h1>
      
      <div className="max-w-md mx-auto">
        {saved && (
          <h2 className="text-center bg-green-300 text-primary text-2xl mb-4">
            Profile Saved
          </h2>
        )}
        {isSaving && (
          <h2 className="text-center bg-blue-300 text-primary text-2xl mb-4">
            Saving...
          </h2>
        )}
        <div className="flex gap-2 items-center">
            <div className=" p-2">
                <Image src={userImage} width={64} height={64} 
                className="rounded-lg" alt={'avatar'} />
                <Label htmlFor="picture">
                  <Input id="picture" type="file" className="hidden" />
                  <span className="block border rounded-lg p-2 text-center cursor-pointer">
                    Edit
                  </span>
                </Label>
            </div>
            <form className="grow" onSubmit={handleProfileInfoUpdate}>
                <Input type="text" placeholder="First and LastName" 
                value={userName} onChange={ev => setUserName(ev.target.value)}/>
                <Input type="email" disabled={true} value={session.data.user.email} />
                <Button type="submit">Save</Button>
            </form>
        </div>
      </div>
    </section>
  );
}