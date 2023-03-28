import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

const ViewParticipant = () => {
  const { eventId } = useParams();
  const [isLoading, setisLoading] = useState(true);

  const [event, setevent] = useState(null);
  const [participant, setParticipant] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch("https://localhost:7035/api/Events", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setevent(data);
          console.log("Event" + data);
        } else {
          console.log(`Failed to fetch event`);
        }
      } catch (error) {
        console.error(`Failed to fetch event`, error);
      }
    };

    const fetchParticipant = async () => {
      try {
        const response = await fetch(
          `https://localhost:7035/api/ParticipantEvents`
        );

        if (response.ok) {
          const data = await response.json();
          setevent(data);
          console.log(eventId);
          const participant = data.filter((p) => p.eventId == eventId);
          setisLoading(false);
          console.log("Participant");
          console.log(participant);

          if (participant) {
            setParticipant(participant);
          }
          console.log(data);
        } else {
          console.log(`Failed to fetch event participant`);
        }
      } catch (error) {
        console.error(`Failed to fetch event participant`, error);
      }
    };

    fetchParticipant();
    // fetchEvent();
  }, []);

  return (
    <>
      {isLoading ? (
        <Grid container align="center" sx={{ marginTop: "20vh" }}>
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Contact Number</TableCell>
                <TableCell align="right">City</TableCell>
                <TableCell align="right">Gender</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {participant.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.contactNumber}</TableCell>
                  <TableCell align="right">{row.city}</TableCell>
                  <TableCell align="right">{row.gender}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default ViewParticipant;
