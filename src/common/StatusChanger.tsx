import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@hooks";
import { getAppStatus, updateAppStatus } from "@context/appstatus";
import { Box, Dialog, DialogContent } from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";
import { PButton } from "./Button";

const styles = {
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: 5,
    marginTop: 30,
    color: "white"
  },
  adjustIconRunning: {
    cursor: "pointer",
    color: "#2bb381"
  },
  adjustIconMaintainance: {
    cursor: "pointer",
    color: "yellow"
  }
};

export default function StatusChanger() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.network.loading);
  const appStatus = useAppSelector((state) => state.appstatus.status);

  const [changeStatusModalOpen, setChangeStatusModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    return () => dispatch(getAppStatus());
  }, []);

  function changeStatus() {
    if (appStatus === "running") {
      setChangeStatusModalOpen(true);
    }

    dispatch(updateAppStatus("running"));
  }
  return (
    <>
      <section style={styles.buttonContainer}>
        <p>{appStatus}</p>
        <AdjustIcon
          onClick={changeStatus}
          sx={
            appStatus === "running"
              ? styles.adjustIconRunning
              : styles.adjustIconMaintainance
          }
          className="fading"
        />
      </section>
      <Dialog
        open={changeStatusModalOpen}
        onClose={() => setChangeStatusModalOpen(false)}
      >
        <DialogContent className="d-flex px-2" sx={{ width: 500 }}>
          <p>Change app status to maintenance mode?</p>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 13
            }}
          >
            <PButton
              text={`Yes, change`}
              colors="error"
              size="small"
              onClick={() => {
                dispatch(updateAppStatus("maintenance"));
                setChangeStatusModalOpen(false);
              }}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
