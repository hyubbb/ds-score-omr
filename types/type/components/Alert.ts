import { IAlert } from "@/types/interface/components/Alert";

export type TAlertData = Omit<IAlert, "isOpen">;
