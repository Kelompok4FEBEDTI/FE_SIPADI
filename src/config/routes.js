import {
  Home,
  HistoryParkirMember,
  HomeMember,
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
    isPublic: true,
  },
  {
    path: '/profilepenjagaparkir',
    component: ProfilePenjagaParkir,
    isPublic: true,
  },
  {
    path: '/myhistory',
    component: HistoryParkirMember,
    isPublic: true,
  },
  {
    path: '/spotparkir',
    component: SpotParkir,
    isPublic: true,
  },
  {
    path: '/homemember',
    component: HomeMember,
    isPublic: true,
  },
  {
    path: '/transaksi',
    component: TransaksiParkir,
    isPublic: true,
  },
  {
    path: '/homepenjagaparkir',
    component: HomePenjagaParkir,
    isPublic: true,
  },
  {
    path: '/',
    component: Home,
    isPublic: true,
  },
];

export default routes;
