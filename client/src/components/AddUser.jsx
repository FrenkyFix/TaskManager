import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import Loading from "./Loader";
import Button from "./Button";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { toast } from "sonner";
import { useUpdateUserMutation } from "../redux/slices/api/userApiSlice";
import { setCredentials } from "../redux/slices/authSlice";

const AddUser = ({ open, setOpen, userData }) => {
  let defaultValues = userData ?? {};
  const { user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const dispatch = useDispatch()
  const [addNewUser, {isLoading}] = useRegisterMutation()
  const [updateUser, {isLoading: isUpdating}] = useUpdateUserMutation()

  const handleOnSubmit = async(data) => {
    try {
      if (userData) {
        const result = await updateUser(data).unwrap()

        toast.success("Профиль успешно изменен!")

        if(userData === user )
          dispatch(setCredentials({...result.user}))
      } else {
        await addNewUser({
          ...data, 
          password: data.email,
        }).unwrap()

        toast.success("Новый пользователь добавлен!")
      }

      setTimeout(() => {
        setOpen(false);
        window.location.reload();
      }, 200);
    } catch (err) {
      toast.error("Что-то пошло не так...")
    }
  };
 
  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            {userData ? "ОБНОВИТЬ ПРОФИЛЬ" : "ДОБАВИТЬ НОВОГО ПОЛЬЗОВАТЕЛЯ"}
          </Dialog.Title>
          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Имя'
              type='text'
              name='name'
              label='Имя'
              className='w-full rounded'
              register={register("name", {
                required: "Введите полное имя!",
              })}
              error={errors.name ? errors.name.message : ""}
            />
            <Textbox
              placeholder='Отдел'
              type='text'
              name='title'
              label='Отдел'
              className='w-full rounded'
              register={register("title", {
                required: "Введите отдел!",
              })}
              error={errors.title ? errors.title.message : ""}
            />
            <Textbox
              placeholder='Электронная почта'
              type='email'
              name='email'
              label='Электронная почта'
              className='w-full rounded'
              register={register("email", {
                required: "Введите электронную почту!",
              })}
              error={errors.email ? errors.email.message : ""}
            />

            <Textbox
              placeholder='Должность'
              type='text'
              name='role'
              label='Должность'
              className='w-full rounded'
              register={register("role", {
                required: "Введите должность!",
              })}
              error={errors.role ? errors.role.message : ""}
            />
          </div>

          {isLoading || isUpdating ? (
            <div className='py-5'>
              <Loading />
            </div>
          ) : (
            <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
              <Button
                type='submit'
                className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                label='Принять'
              />

              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                onClick={() => setOpen(false)}
                label='Отмена'
              />
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddUser;