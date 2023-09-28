import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { ModalAddNewPack } from './components/ui/modalAddNewPack/modalAddNewPack.tsx'
import { CheckEmail, CreateNewPassword, ForgotPassword, SignIn, SignUp } from './components/auth'
import { Dropdown, Layout } from './components/ui'
import { AvatarForDropdownIcon } from './components/ui/icons/avatarForDropdownIcon.tsx'
import { DeleteIcon } from './components/ui/icons/deleteIcon.tsx'
import { LogOutIcon } from './components/ui/icons/logOutIcon.tsx'
import { PenIcon } from './components/ui/icons/penIcon.tsx'
import { PersonIcon } from './components/ui/icons/personIcon.tsx'
import { PlayIcon } from './components/ui/icons/playIcon.tsx'
import { EmptyPack } from 'src/components/ui/packListVersial/emptyPack/emptyPack.tsx'
import { FriendsPackList } from 'src/components/ui/packListVersial/friendsPackList/FriendsPackList.tsx'
import { MyPack } from 'src/components/ui/packListVersial/myPack/MyPack.tsx'
import { PackList } from 'src/components/ui/packListVersial/packList/PackList.tsx'
import { useGetDecksQuery } from './services/base-api.ts'

import { Profile } from 'src/components/ui/profile'
import {Error} from "src/components/ui/error/error.tsx";

export const Router = () => {
  const result = useGetDecksQuery()

  console.log(result)

  return <RouterProvider router={router} />
}
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path={'/signIn'} element={<SignIn onSubmit={() => {}} />} />
      <Route path={'/checkEmail'} element={<CheckEmail />} />
      <Route path={'/recover-password/:token'} element={<CreateNewPassword />} />
      <Route path={'/emptyPack'} element={<EmptyPack />} />
      <Route path={'/packList'} element={<PackList nameForPack={'Pack List'} />} />
      <Route path={'/friendsPack'} element={<FriendsPackList />} />
      <Route path={'/myPack'} element={<MyPack />} />
      <Route path={'/profile'} element={<Profile />} />
      <Route path={'/modal'} element={<ModalAddNewPack />} />
      <Route path={'/pageNotFound'} element={<Error />} />
      <Route
        path={'/dropdown'}
        element={
          <Dropdown
            isDropdownOpen={true}
            options={[
              {
                icon: <AvatarForDropdownIcon />,
                link: (
                  <div>
                    <div>Ivan</div>
                    <div> j&johnson@gmail.com</div>
                  </div>
                ),
              },
              {
                icon: <PersonIcon />,
                link: <span>My profile</span>,
              },
              {
                icon: <LogOutIcon />,
                link: <span>Sign Out</span>,
              },
            ]}
          />
        }
      />
      <Route
        path={'/settings'}
        element={
          <Dropdown
            isDropdownOpen={true}
            options={[
              {
                icon: <PlayIcon />,
                link: <span>Learn</span>,
              },
              {
                icon: <PenIcon />,
                link: <span>Edit</span>,
              },
              {
                icon: <DeleteIcon />,
                link: <span>Delete</span>,
              },
            ]}
          />
        }
      />
      <Route path={'/forgotPassword'} element={<ForgotPassword />} />
      <Route path={'/signUp'} element={<SignUp />} />
    </Route>
  )
)
