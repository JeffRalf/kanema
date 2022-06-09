<template>
  <table>
    <thead>
      <th>Email</th>
      <th>First name</th>
      <th>Lirst name</th>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.email">
        <td>{{ user.email }}</td>
        <td>{{ user.firstName }}</td>
        <td>{{ user.lastName }}</td>
        <td>
          <button class="delete-button" @click="deleteUser(user._id)">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";

export default {
  name: "UsersTable",
  props: {
    users: Array,
  },
  emits: ["userDeleted"],
  methods: {
    deleteUser: function (userId) {
      axios
        .delete(`${process.env.VUE_APP_BACKEND_BASE_URL}/users/${userId}`)
        .then(() => {
          this.$emit("userDeleted");
        })
        .catch((error) => {
          alert("An error occured while deleting the user.");
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #000000;
  padding: 10px;
}

.delete-button {
  cursor: pointer;
}
</style>
