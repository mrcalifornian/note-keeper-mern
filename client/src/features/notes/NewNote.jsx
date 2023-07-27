import React from "react";
import { useGetUsersQuery } from "../users/usersApiSlice";
import NewNoteFrom from "./NewNoteFrom";
import PulseLoader from "react-spinners/PulseLoader";

const NewNote = () => {
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!users?.length) return <PulseLoader color="FFF" />;

  const content = <NewNoteFrom users={users} />;
  return content;
};

export default NewNote;
