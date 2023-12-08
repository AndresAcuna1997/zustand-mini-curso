import { StateCreator } from 'zustand';

export interface ConfirmSlice {
  isConfirmed: boolean;
  setIsConfirmed: ( value: boolean ) => void;
}

export const createConfimAssistsSlice: StateCreator<ConfirmSlice> = ( set ) => ( {
  isConfirmed: true,
  setIsConfirmed: ( value: boolean ) => {
    set( { isConfirmed: value } );
  }
} );