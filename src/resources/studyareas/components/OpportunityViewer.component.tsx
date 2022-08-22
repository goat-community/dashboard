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
  Toolbar,
  useDelete
} from "react-admin";
import {
  getOpportunitiesGroup,
  getOpportunitiesList,
  updateStudyAreaOpportunity
} from "@context/studyareas";
import type { Opportunity } from "@types";

const label = { inputProps: { "aria-label": "Switch demo" } };

const DeleteButton = ({ id }: { id: number }) => {
  const [deleteOne, { isLoading, error }] = useDelete(
    "studyareas",
    {
      id: id
    },
    {
      onSettled: () => {
        location.reload();
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
  modalClosed: () => void;
}) {
  const dispatch = useAppDispatch();
  const opps = useAppSelector((state) => state.studyareas.opportunitiesList);
  const groups = useAppSelector((state) => state.studyareas.opportunityGroups);
  const loading = useAppSelector((state) => state.network.loading);

  const [writeCategory, setWriteCategory] = useState<boolean | string>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(true);
  const [form, setForm] = useState({
    id: props.opportunityData.id,
    multiple_entrance: props.opportunityData.multiple_entrance,
    opportunity_group_id: props.opportunityData.opportunity_group_id,
    category: props.opportunityData.category,
    icon: props.opportunityData.icon,
    color: props.opportunityData.color,
    study_area_id: props.opportunityData.study_area_id,
    is_active: props.opportunityData.is_active
  });

  useEffect(() => {
    batch(() => {
      dispatch(getOpportunitiesList());
      dispatch(getOpportunitiesGroup());
    });
  }, []);

  const closeModal = () => {
    props.modalClosed();
    setDialogOpen(false);
  };

  const submit = () => {
    if (!form.opportunity_group_id) {
      return false;
    }
    if (!form.icon) {
      return false;
    }
    if (!form.category) {
      return false;
    }
    if (!form.color) {
      return false;
    }

    dispatch(updateStudyAreaOpportunity(form as Opportunity));
    closeModal();
  };

  const displayStyle = { xs: "block", sm: "flex", width: "100%" };

  return (
    <>
      <Dialog open={dialogOpen} onClose={closeModal}>
        <DialogContent className="d-flex px-2" sx={{ width: 400 }}>
          <p style={{ fontSize: 20 }}>
            Opportunitiy {props.opportunityData.id}
          </p>
          <SimpleForm
            toolbar={
              <CustomToolbar loading={loading} id={props.opportunityData.id} />
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
                defaultValue={form.multiple_entrance}
                onChange={(e) =>
                  setForm({
                    ...form,
                    multiple_entrance: e.target.value
                  })
                }
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
                  defaultValue={form.category}
                  choices={opps}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      category: e.target.value
                    });
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
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: e.target.value
                    })
                  }
                  value={form.category}
                  defaultValue={form.category}
                />
              )}
            </Box>
            <Box flex={1} display={displayStyle}>
              <SelectInput
                source="group_id"
                emptyText={"Select a group"}
                fullWidth
                choices={groups}
                defaultValue={form.opportunity_group_id}
                onChange={(e) =>
                  setForm({
                    ...form,
                    opportunity_group_id: e.target.value
                  })
                }
                variant="outlined"
                optionText="group"
                optionValue="id"
              />
            </Box>
            <Box flex={1} display={displayStyle}>
              <TextField
                label="icon"
                defaultValue={form.icon}
                required
                fullWidth
                onChange={(e) =>
                  setForm({
                    ...form,
                    icon: e.target.value
                  })
                }
                variant="outlined"
              />
            </Box>
            <br />
            <Box flex={1} display={displayStyle}>
              <ChipInput
                sx={{ width: "100%" }}
                label="Colors"
                onChange={(color) =>
                  setForm({
                    ...form,
                    color: color
                  })
                }
                defaultValue={form.color}
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
                onChange={(e) =>
                  setForm({
                    ...form,
                    is_active: e.target.value
                  })
                }
                choices={[{ name: true }, { name: false }]}
                defaultValue={form.is_active}
                optionValue="name"
              />
            </Box>
          </SimpleForm>
        </DialogContent>
      </Dialog>
    </>
  );
}
