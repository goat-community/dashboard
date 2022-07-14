import {
  Datagrid,
  TextField,
  List,
  useResourceContext,
  EmailField
} from "react-admin";

const ResourceName = () => {
  const resource = useResourceContext();
  return <>{resource}</>;
};

export function UsersList() {
  return (
    <List>
      <>
        <ResourceName /> {/* renders 'posts' */}
        <Datagrid>
          <TextField source="name" />
          <TextField source="surname" />
          <EmailField source="email" />
        </Datagrid>
      </>
    </List>
  );
}
