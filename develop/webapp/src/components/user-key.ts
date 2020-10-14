import { InjectionKey } from 'vue';
import { UserStore } from '@/store/user';

const UserKey: InjectionKey<UserStore> = Symbol('UserStore');
export default UserKey;