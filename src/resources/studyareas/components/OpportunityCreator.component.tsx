import { useEffect, useState } from "react";
import { Box, Chip, Dialog, DialogContent } from "@mui/material";
import { ChipInput } from "@common";
import { useAppDispatch, useAppSelector } from "@hooks";
import {
  LoadingIndicator,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar,
  useCreateController
} from "react-admin";
import {
  getOpportunitiesGroup,
  getOpportunitiesList
} from "@context/studyareas";
import { batch } from "react-redux";
import Switch from "@mui/material/Switch";
import { removeEmptyProperties } from "@utils";

const label = { inputProps: { "aria-label": "Switch demo" } };

const CustomToolbar = (props: any) => {
  return (
    <Toolbar
      {...props}
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      {props.loading && <LoadingIndicator />}
      {!props.loading && <SaveButton alwaysEnable />}
    </Toolbar>
  );
};

export function OpportunityCreatorComponent(props: { studyAreaId: number }) {
  const { save, saving } = useCreateController({ resource: "studyareas" });
  const dispatch = useAppDispatch();
  const opps = useAppSelector((state) => state.studyareas.opportunitiesList);
  const groups = useAppSelector((state) => state.studyareas.opportunityGroups);

  const [colors, setColors] = useState<[] | string[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [writeCategory, setWriteCategory] = useState<boolean | string>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

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
      study_area_id: props.studyAreaId,
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

    save!(removeEmptyProperties(data_to_submit));
    setDialogOpen(false);
  };

  const displayStyle = { xs: "block", sm: "flex", width: "100%" };

  return (
    <>
      <Chip
        label="Create Opportunity + "
        color="success"
        sx={{ margin: 1, backgroundColor: "#2bb381" }}
        onClick={() => setDialogOpen(true)}
      />

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent className="d-flex px-2" sx={{ width: 400 }}>
          <p style={{ fontSize: 20 }}>Creating new Opportunitiy</p>
          <SimpleForm
            toolbar={<CustomToolbar loading={saving} />}
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
                defaultValue={true}
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
                <TextInput
                  source="category"
                  isRequired
                  fullWidth
                  onChange={(e) => setCategory(e.target.value)}
                  variant="outlined"
                />
              )}
            </Box>
            <Box flex={1} display={displayStyle}>
              <SelectInput
                source="group_id"
                emptyText={"Select a group"}
                fullWidth
                choices={groups}
                variant="outlined"
                optionText="group"
                optionValue="id"
              />
            </Box>
            <Box flex={1} display={displayStyle}>
              <TextInput
                source="icon"
                isRequired
                fullWidth
                variant="outlined"
              />
            </Box>
            <Box flex={1} display={displayStyle}>
              <ChipInput
                sx={{ width: "100%" }}
                label="Colors"
                onChange={(color) => setColors(color)}
                defaultValue={[]}
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
                defaultValue={true}
                optionValue="name"
              />
            </Box>
          </SimpleForm>
        </DialogContent>
      </Dialog>
    </>
  );
}
