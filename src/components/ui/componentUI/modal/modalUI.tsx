import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TModalProps } from "./types";

export function ModalUI({ title, onClick, history }: TModalProps) {
  const filterHistory = history?.filter(
    (item, index) => history.indexOf(item) === index
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => onClick()}>
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Historial de búsqueda</DialogTitle>
        <div className="grid gap-4 py-4">
          <ul className="text-[14px] list-disc pl-5">
            {history?.length === 0 ? (
              <p>No hay datos.</p>
            ) : (
              filterHistory?.map((item, index) => {
                return (
                  <li
                    key={`key-${index}`}
                    className="text-[#000] marker:text-[#a702a49f] dark:text-white"
                  >
                    {item}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
