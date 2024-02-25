"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { Detail } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import { AlertModal } from "@/components/modals/alert-modal"

const formSchema = z.object({
  name: z.string().min(1),
  info: z.string().min(1),
});

type DetailFormValues = z.infer<typeof formSchema>

interface DetailFormProps {
  initialData: Detail | null;
};

export const DetailForm: React.FC<DetailFormProps> = ({
  initialData
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit detail' : 'Create detail';
  const description = initialData ? 'Edit a detail.' : 'Add a new detail';
  const toastMessage = initialData ? 'Detail updated.' : 'Detail created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<DetailFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: ''
    }
  });

  const onSubmit = async (data: DetailFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/details/${params.detailId}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/details`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/details`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/details/${params.detailId}`);
      router.refresh();
      router.push(`/${params.storeId}/details`);
      toast.success('Detail deleted.');
    } catch (error: any) {
      toast.error('Make sure you removed all products using this detail first.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
    <AlertModal 
      isOpen={open} 
      onClose={() => setOpen(false)}
      onConfirm={onDelete}
      loading={loading}
    />
     <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Detail Product" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="info"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thông tin chính</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Detail info" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
