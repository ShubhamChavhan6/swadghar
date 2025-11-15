'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { BellRing, Send, Loader2 } from 'lucide-react';
import { getWaiterResponse, type WaiterCallState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { cn } from '@/lib/utils';

const initialState: WaiterCallState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="rounded-full">
      {pending ? <Loader2 className="animate-spin" /> : <Send />}
      <span className={cn({"ml-2": !pending})}>{pending ? 'Sending...' : 'Send Request'}</span>
    </Button>
  );
}

export function CallWaiterDialog() {
  const [state, formAction] = useFormState(getWaiterResponse, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (state.message) {
      toast({
        title: 'Request Sent',
        description: state.response,
      });
      formRef.current?.reset();
      // Wait a bit before closing to allow user to read the message in the dialog
      setTimeout(() => {
        closeButtonRef.current?.click();
      }, 3000);
    }
    if (state.error) {
      toast({
        title: 'Error',
        description: state.error,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full rounded-full" variant="outline">
          <BellRing />
          Call Waiter
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Call a Waiter</DialogTitle>
          <DialogDescription>
            Need something? Let us know and a staff member will be with you shortly.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} action={formAction} className="space-y-4">
          <Textarea
            name="requestDetails"
            placeholder="e.g., 'Can I get some more water?', 'Question about my order', 'Ready to pay'"
            rows={4}
            required
            className="rounded-lg"
          />
          <DialogFooter>
             <SubmitButton />
          </DialogFooter>
        </form>
         {state.message && (
          <Alert variant={state.urgency === 'high' ? 'destructive' : 'default'}>
            <AlertTitle>Request Sent!</AlertTitle>
            <AlertDescription>
                <p className="font-semibold">{state.message}</p>
                <p className="text-sm text-muted-foreground mt-2">A staff member will attend to you shortly. Our AI assistant interpreted your request as <span className="font-bold">{state.urgency}</span> urgency.</p>
            </AlertDescription>
          </Alert>
        )}
        <DialogClose ref={closeButtonRef} className="hidden" />
      </DialogContent>
    </Dialog>
  );
}
