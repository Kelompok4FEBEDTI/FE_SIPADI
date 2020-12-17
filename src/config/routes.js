import {
  Home,
  HistoryParkirMember,
  HomePenjagaParkir,
  LoginMember,
  LoginPenjagaParkir,
  ProfileMember,
  ProfilePenjagaParkir,
  RegisterMember,
  SpotParkir,
  TransaksiParkir,
} from '../pages';

const routes = [
  {
    path: '/loginmember',
    component: LoginMember,
    isPublic: true,
  },
  {
    path: '/registermember',
    component: RegisterMember,
    isPublic: true,
  },
  {
    path: '/loginpenjagaparkir',
    component: LoginPenjagaParkir,
    isPublic: true,
  },
  {
    path: '/profilemember',
    component: ProfileMember,
    isPublic: false,
  },
  {
    path: '/profilepenjagaparkir',
    component: ProfilePenjagaParkir,
    isPublic: false,
  },
  {
    path: '/myhistory',
    component: HistoryParkirMember,
    isPublic: false,
  },
  {
    path: '/spotparkir',
    component: SpotParkir,
    isPublic: true,
  },
  {
    path: '/transaksi',
    component: TransaksiParkir,
    isPublic: false,
  },
  {
    path: '/homepenjagaparkir',
    component: HomePenjagaParkir,
    isPublic: false,
  },
  {
    path: '/',
    component: Home,
    isPublic: true,
  },
];

export default routes;
