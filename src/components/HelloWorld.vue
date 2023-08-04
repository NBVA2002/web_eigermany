<template>
  <div class="hello">
    <form class="form-intput" @submit.prevent="onAction">
      <div class="input-item">
        <span>Name</span>
        <input
          type="text"
          class="name-input"
          placeholder="Name"
          v-model="name"
        />
      </div>
      <div class="input-item">
        <span>Age</span>
        <input type="text" class="age-input" placeholder="Age" v-model="age" />
      </div>
      <div class="input-item">
        <span>Phone</span>
        <input
          type="text"
          class="phone-input"
          placeholder="Phone"
          v-model="phone"
        />
      </div>
      <div class="input-item">
        <span>Email</span>
        <input
          type="email"
          class="email-input"
          placeholder="Email"
          v-model="email"
        />
      </div>
    </form>
    <button class="btn" @click="onAction()">{{ action }}</button>
    <div class="table">
      <table border="1" class="table">
        <tr>
          <td class="id">ID</td>
          <td class="name">NAME</td>
          <td class="age">AGE</td>
          <td class="phone">PHONE</td>
          <td class="email">EMAIL</td>
          <td class="action">ACTION</td>
        </tr>
        <tr v-for="i in info" :key="i.id">
          <td class="id">{{ i.id }}</td>
          <td class="name">{{ i.name }}</td>
          <td class="age">{{ i.age }}</td>
          <td class="phone">{{ i.phone }}</td>
          <td class="email">{{ i.email }}</td>
          <td class="action">
            <button class="btn-action" @click="onUpdate(i.id)">
              {{ i.actionText }}
            </button>
            <button class="btn-delete" @click="onDelete(i.id)">DELETE</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      // autoIncrement: 1,
      name: "",
      age: "",
      phone: "",
      email: "",
      action: "Add",
      inUpdate: null,
      info: [
        {
          id: 1,
          name: "name1",
          age: "age",
          phone: "phone",
          email: "email",
          action: false,
          actionText: "Edit",
        },
        {
          id: 2,
          name: "name",
          age: "age",
          phone: "phone",
          email: "email",
          action: false,
          actionText: "Edit",
        },
        {
          id: 3,
          name: "name",
          age: "age",
          phone: "phone",
          email: "email",
          action: false,
          actionText: "Edit",
        },
        {
          id: 4,
          name: "name",
          age: "age",
          phone: "phone",
          email: "email",
          action: false,
          actionText: "Edit",
        },
      ],
    };
  },
  props: {
    msg: String,
  },
  methods: {
    onAction() {
      if(this.name == "" || this.age == "" || this.phone == "" || this.email == ""){
        alert("Please fill in all the information");
        return;
      }
      if (this.action == "Add") {
        this.info.push({
          id: this.info.length + 1,
          name: this.name,
          age: this.age,
          phone: this.phone,
          email: this.email,
          action: false,
          actionText: "Edit",
        });
      } else if (this.action == "Update") {
        this.info[this.inUpdate - 1].name = this.name;
        this.info[this.inUpdate - 1].age = this.age;
        this.info[this.inUpdate - 1].phone = this.phone;
        this.info[this.inUpdate - 1].email = this.email;
        this.info[this.inUpdate - 1].action = !this.info[this.inUpdate].action;
        this.info[this.inUpdate - 1].actionText = "Edit";
        this.action = "Add";
        this.inUpdate = null;
      }
    },
    onDelete(id) {
      this.info.splice(id - 1, 1);
    },
    onUpdate(id) {
      if (this.action == "Add") {
        this.info[id - 1].action = !this.info[id - 1].action;
        if (this.info[id - 1].action == false) {
          this.info[id - 1].actionText = "Edit";
        } else {
          this.info[id - 1].actionText = "On Edit";
        }
        this.action = "Update";
        this.inUpdate = id;
      } else if (this.action == "Update" && this.inUpdate == id) {
        this.info[id - 1].action = !this.info[id - 1].action;
        if (this.info[id - 1].action == false) {
          this.info[id - 1].actionText = "Edit";
        } else {
          this.info[id - 1].actionText = "On Edit";
        }
        this.action = "Add";
        this.inUpdate = null;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.form-intput {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 20px;
  width: 100%;
  max-width: 700px;
}

.form-intput .input-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.input-item span {
  margin-left: 15px;
  margin-bottom: 5px;
  align-self: flex-start;
}

.form-intput input {
  padding: 10px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.btn {
  width: 100px;
  height: 40px;
  cursor: pointer;
  margin-bottom: 20px;
}

.table {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.id {
  width: 60px;
}

.name {
  width: 250px;
}

.age {
  width: 50px;
}

.phone {
  width: 200px;
}

.email {
  width: 250px;
}

.action {
  width: 80px;
}

.btn-action,
.btn-delete {
  width: 100%;
  background-color: #fff;
}
</style>
