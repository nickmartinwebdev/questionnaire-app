import { Group, Stack, Text } from "@mantine/core";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div
      style={{
        backgroundColor: "darkslategray",
        display: "flex",
        padding: "1rem",
      }}
    >
      <Group align="center" position="apart" sx={{ flex: 1 }}>
        <Text
          sx={{ color: "white" }}
          component={Link}
          to="/home/questionnaires"
        >
          Questionnaires
        </Text>
        <Text sx={{ color: "white" }} component={Link} to="/signin">
          Sign out
        </Text>
      </Group>
    </div>
  );
};
