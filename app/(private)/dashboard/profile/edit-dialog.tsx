"use client"

import {Avatar, AvatarFallback, AvatarImage} from '@/app/_components/ui/avatar'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/_components/ui/form"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog"

import {useForm} from "react-hook-form";
import {useServerAction} from "zsa-react";
import {DottedSeparator} from "@/app/_components/dotted-separator";
import {ImageIcon, Pencil} from "lucide-react";
import {type ChangeEvent, useRef, useState} from "react";
import {useRouter} from "next/navigation"
import {Button} from "@/app/_components/ui/button";
import {LoaderButton} from "@/app/_components/loader-button"
import {removeUserProfilePicAction, updateUserAction, updateUserProfilePicAction} from "./actions";
import {Input} from "@/app/_components/ui/input";
import {type UserSafe} from "@/src/modules/user/models/user";
import {useToast} from "@/app/_hooks/use-toast";
import env from "@/env";

// TODO: this component is doing a lot of stuff, i don't think thats right. I should fix this
export default function ProfileEditDialog({user}: {user: UserSafe}) {
  const {toast} = useToast()

  const [open, setOpen] = useState(false)
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(user.imgUrl ?? null)
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null)
  const [imageChanged, setImageChanged] = useState(false)
  const [imageUploadError, setImageUploadError] = useState<string | null>(null)

  const router = useRouter()

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const form = useForm<{name: string, email: string}>({
    defaultValues: {
      email: user.email,
      name: user.name
    }
  })

  const {execute: executeUpdateAction, isPending: isUpdateActionPending} = useServerAction(updateUserAction, {
    onError({err}) {
      toast({
        title: "Something went wrong!",
        description: err.message,
        variant: "destructive"
      })
    }
  })

  const {execute: executeUploadAction, isPending: isUploadPending} = useServerAction(updateUserProfilePicAction, {
    onError({err}) {
      toast({
        title: "Something went wrong!",
        description: err.message,
        variant: "destructive"
      })
      setImageUploadError(err.message)
    }
  })
  const {execute: executeRemoveAction, isPending: isRemovePending} = useServerAction(removeUserProfilePicAction, {
    onError({err}) {
      toast({
        title: "Something went wrong!",
        description: err.message,
        variant: "destructive"
      })
    }
  })


  const updateImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file)
      setProfilePictureUrl(url)
      setProfilePictureFile(file)
      setImageChanged(true)
      setImageUploadError(null)
    }
  }

  const onRemoveImage = async () => {
    await executeRemoveAction()
    window.location.reload()
  }

  const onFileInputClick = () => {
    if (fileInputRef === null) return;
    fileInputRef.current?.click()
  }

  const onSubmit = async (values: {name: string, email: string}) => {
    if (imageChanged && profilePictureFile) {
      await executeUploadAction({file: profilePictureFile});
    }
    if (imageUploadError) return
    await executeUpdateAction(values)
    toast({
      title: "Success!",
      description: "User updated!"
    })
    setOpen(false)
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Pencil className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-md">
        <DialogHeader>
          <DialogTitle>Edit your profile</DialogTitle>
          <DialogDescription>
            Fill the form below and change the information of your profile
          </DialogDescription>
        </DialogHeader>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <Form {...form}>
          <div className="flex flex-col items-center justify-center w-full">
            <Avatar className="relative w-20 h-20 group">
              {profilePictureUrl && <AvatarImage src={profilePictureUrl} />}
              <AvatarFallback className="text-4xl">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
              <div className="absolute hidden group-hover:block w-full h-full backdrop-blur-[6px]">
                <button className="items-center justify-center w-full h-full group-hover:flex" onClick={onFileInputClick} disabled={isUploadPending || isRemovePending}>
                  <ImageIcon className="text-black" />
                </button>
              </div>
              <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={updateImage} disabled={isUploadPending || isRemovePending} />
            </Avatar>
            {user.imgUrl && <button className="text-sm text-muted-foreground hover:underline" onClick={onRemoveImage}>remove</button>}
            {imageUploadError && <div className="text-sm text-red-500">{imageUploadError}</div>}
          </div>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter your email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoaderButton type="submit" variant="default" size="lg" isLoading={isUploadPending || isUploadPending || isRemovePending}>
              Submit
            </LoaderButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
