import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ButtonLoad from "./button-load";

export function AlertDialogComponent({
    open,
    setOpen,
    label,
    isPending,
    onContinue,
}: {
    open: boolean;
    setOpen: any;
    label?: string;
    isPending: boolean;
    onContinue: any;
}) {
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {label
                            ? label
                            : "Are you sure you want to delete this?"}
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <ButtonLoad
                        isPending={isPending}
                        label="Continue"
                        onClick={onContinue}
                    />
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
