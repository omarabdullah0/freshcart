'use client'
import { addToCart } from '@/api/cart/actions/addCart.action';
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { ReactNode } from 'react'
import { toast } from 'sonner';

interface pageProps {
  children: ReactNode;
  cls: string; 
  id: string;
}

export default function ButtonCom({ children, cls, id }: pageProps) {
  const queryClient = useQueryClient()
  
  const { mutate } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      toast.success('product added successfully', { position: "top-center" });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: () => {
      toast.error("login first", { position: "top-center" });
    },
  });

  function handleAddToCart() {
    mutate(id);
  }

  return (
    <div>
      <Button onClick={handleAddToCart} className={cls}>
        {children}
      </Button>
    </div>
  )
}