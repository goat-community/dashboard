import { useEffect, useState } from "react";
import { batch } from "react-redux";
import Switch from "@mui/material/Switch";
import { Box, Dialog, DialogContent, TextField } from "@mui/material";
import { ChipInput } from "@common";
import { useAppDispatch, useAppSelector } from "@hooks";
import {
  Button,
  LoadingIndicator,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar,
  useCreateController,
  useDelete,
  useRecordContext,
  useRedirect
} from "react-admin";
import {
  getOpportunitiesGroup,
  getOpportunitiesList
} from "@context/studyareas";
import type { Opportunity } from "@types";

const label = { inputProps: { "aria-label": "Switch demo" } };

const DeleteButton = ({ id }: { id: number }) => {
  const redirect = useRedirect();
  const [deleteOne, { isLoading, error }] = useDelete(
    "studyareas",
    {
      id: id
    },
    {
      onSettled: (data, error) => {
        redirect("/studyareas");
      }
    }
  );
  const handleClick = () => {
    deleteOne();
  };
  if (error) {
    return <p>ERROR</p>;
  }
  return (
    <>
      {isLoading && <LoadingIndicator />}
      {!isLoading && (
        <Button
          disabled={isLoading}
          onClick={handleClick}
          variant="contained"
          sx={{ backgroundColor: "red", "&:hover": { backgroundColor: "red" } }}
        >
          <p style={{ fontSize: 17 }}>Delete</p>
        </Button>
      )}
    </>
  );
};

const CustomToolbar = (props: any) => {
  return (
    <Toolbar
      {...props}
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      {props.loading && <LoadingIndicator />}
      {!props.loading && <SaveButton alwaysEnable />}
      <DeleteButton id={props.id} />
    </Toolbar>
  );
};

export function OpportunityViewerComponent(props: {
  opportunityData: Opportunity;
}) {
  const { save, saving } = useCreateController({ resource: "studyareas" });
  const dispatch = useAppDispatch();
  const opps = useAppSelector((state) => state.studyareas.opportunitiesList);
  const groups = useAppSelector((state) => state.studyareas.opportunityGroups);

  const [colors, setColors] = useState<[] | string[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [writeCategory, setWriteCategory] = useState<boolean | string>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(true);

  useEffect(() => {
    batch(() => {
      dispatch(getOpportunitiesList());
      dispatch(getOpportunitiesGroup());
    });
  }, []);

  const submit = (data: any) => {
    const data_to_submit = {
      multiple_entrance: data.multiple_entrance,
      opportunity_group_id: data.group_id,
      category: category,
      icon: data.icon,
      color: colors,
      study_area_id: props.opportunityData.study_area_id,
      is_active: data.is_active
    };

    if (!data.group_id) {
      return false;
    }
    if (!data.icon) {
      return false;
    }
    if (!category) {
      return false;
    }
    if (!colors) {
      return false;
    }

    save!(data_to_submit);
    setDialogOpen(false);
  };

  const displayStyle = { xs: "block", sm: "flex", width: "100%" };

  return (
    <>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent className="d-flex px-2" sx={{ width: 400 }}>
          <p style={{ fontSize: 20 }}>
            Opportunitiy {props.opportunityData.id}
          </p>
          <SimpleForm
            toolbar={
              <CustomToolbar loading={saving} id={props.opportunityData.id} />
            }
            onSubmit={submit}
            redirect="false"
          >
            <Box flex={1} display={displayStyle}>
              <SelectInput
                source="multiple_entrance"
                emptyText="Choose mutiple entrance status"
                variant="outlined"
                fullWidth
                isRequired
                choices={[{ name: true }, { name: false }]}
                defaultValue={props.opportunityData.multiple_entrance}
                optionValue="name"
              />
            </Box>
            <Box flex={1}>
              <span>I want to write category my self</span>
              <Switch
                value={Boolean(writeCategory)}
                onChange={() => {
                  if (writeCategory) {
                    setWriteCategory(false);
                  } else {
                    setWriteCategory(true);
                  }
                }}
                {...label}
                size="small"
                color="secondary"
              />
            </Box>
            <Box flex={1} display={displayStyle}>
              {!writeCategory && (
                <SelectInput
                  source="category"
                  emptyText={"Select a category"}
                  fullWidth
                  value={props.opportunityData.category}
                  choices={opps}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  variant="outlined"
                  optionText="category"
                  optionValue="category"
                />
              )}
              {writeCategory && (
                <TextField
                  label="category"
                  variant="outlined"
                  required
                  fullWidth
                  sx={{ marginBottom: 3 }}
                  onChange={(e) => setCategory(e.target.value)}
                  value={props.opportunityData.category}
                />
              )}
            </Box>
            <Box flex={1} display={displayStyle}>
              <SelectInput
                source="group_id"
                emptyText={"Select a group"}
                fullWidth
                choices={groups}
                value={props.opportunityData.opportunity_group_id}
                variant="outlined"
                optionText="group"
                optionValue="id"
              />
            </Box>
            <Box flex={1} display={displayStyle}>
              <TextField
                label="icon"
                value={props.opportunityData.icon}
                required
                fullWidth
                variant="outlined"
              />
            </Box>
            <br />
            <Box flex={1} display={displayStyle}>
              <ChipInput
                sx={{ width: "100%" }}
                label="Colors"
                onChange={(color) => setColors(color)}
                defaultValue={props.opportunityData.color}
              />
            </Box>
            <br />
            <Box flex={1} display={displayStyle}>
              <SelectInput
                source="is_active"
                variant="outlined"
                emptyText="Choose is_active status please!"
                fullWidth
                isRequired
                choices={[{ name: true }, { name: false }]}
                defaultValue={props.opportunityData.is_active}
                optionValue="name"
              />
            </Box>
          </SimpleForm>
        </DialogContent>
      </Dialog>
    </>
  );
}
