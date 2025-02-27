import React, { FC } from "react";
import { Header, Page, useNavigate, useSnackbar } from "zmp-ui";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserData } from "redux/types";
import { addNewUser } from "services/user.service";
import store from "redux";

const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<UserData> = async (data) => {
    const success = await addNewUser(data);
    if (success) {
      snackbar.openSnackbar({
        type: success.type || "error",
        text: success.text,
      });
      if (success.type != "error") {
        await store.dispatch("register", { data });

        navigate("/profile"); // Navigate to the profile page upon success
      }
    }
  };

  return (
    <Page>
      <Header title="Đăng ký" showBackIcon={false} />
      <form id="form_register" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input_item"
          placeholder="First Name"
          {...register("firstName", { required: true, maxLength: 20 })}
        />
        {errors.firstName && <p>First name is required.</p>}

        <input
          className="input_item"
          placeholder="Last Name"
          {...register("lastName", { required: true, maxLength: 20 })}
        />
        {errors.lastName && <p>Last name is required.</p>}

        <input
          className="input_item"
          type="email"
          placeholder="Email"
          {...register("email", { required: true, maxLength: 40 })}
        />
        {errors.firstName && <p>Email is required.</p>}

        <input
          className="input_item"
          type="password"
          placeholder="Password"
          {...register("password", { required: true, maxLength: 20 })}
        />
        {errors.lastName && <p>Password is required.</p>}
        <input
          className="input_item"
          placeholder="Your age"
          {...register("age", { pattern: /\d+/ })}
        />
        {errors.age && <p>Please enter number for age.</p>}
        {/* role */}
        <label className="label_gen">Role Selection</label>
        <select className="input_item" {...register("role")}>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        {/* sex */}
        <label className="label_gen">Gender Selection</label>
        <select className="input_item" {...register("gender")}>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </select>
        <input className="button_item" type="submit" />
      </form>
    </Page>
  );
};

export default RegisterPage;
