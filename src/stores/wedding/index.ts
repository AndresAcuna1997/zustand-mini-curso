import { create } from 'zustand';
import { PersonSlice, createPersonSlice } from './person.slice';
import { devtools } from 'zustand/middleware';
import { createGuestsSlice, GuestSlice } from './guest.slice';
import { DateSlice, createDateSlice } from './date.slice';
import { ConfirmSlice, createConfimAssistsSlice } from './confirmAssits.slice';

type ShareState = PersonSlice & GuestSlice & DateSlice & ConfirmSlice;

export const useWeddingBoundStore = create<ShareState>()(
  devtools(
    ( ...a ) => ( {
      ...createPersonSlice( ...a ),
      ...createGuestsSlice( ...a ),
      ...createDateSlice( ...a ),
      ...createConfimAssistsSlice( ...a )
    } )
  )
);