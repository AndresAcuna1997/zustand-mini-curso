import { StateCreator, create } from 'zustand';
import { AuthStatus } from '../../interfaces/auth-status.type';
import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { devtools } from 'zustand/middleware';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;
  loginUser: ( email: string, password: string ) => Promise<void>;
  logoutUser: () => void;
  checkAuthStatus: () => Promise<void>;
}

const storeApi: StateCreator<AuthState> = ( set ) => ( {
  status: 'pending',
  token: undefined,
  user: undefined,
  loginUser: async ( email: string, password: string ) => {
    try {
      const { token, ...user } = await AuthService.login( email, password );
      set( { status: 'authorized', token, user } );
    } catch ( error ) {
      set( { status: 'unauthorized', token: undefined, user: undefined } );
      throw new Error( "Unable to login" );
    }
  },
  checkAuthStatus: async () => {
    try {
      const { token, ...user } = await AuthService.checkStatus();
      set( { status: 'authorized', token, user } );
    } catch ( error ) {
      set( { status: 'unauthorized', token: undefined, user: undefined } );
      throw new Error( "Unable to check Status" );
    }
  },
  logoutUser: () => {
    set( { status: 'unauthorized', token: undefined, user: undefined } );
  }
} );


export const useAuthStore = create<AuthState>()( devtools( storeApi ) );