import { IModal } from '@/types/interface/components/Modal';

export type TModalData = Omit<IModal, 'isOpen' | 'renderCount'>;
