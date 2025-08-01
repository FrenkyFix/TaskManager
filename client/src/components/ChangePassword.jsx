import { Dialog, DialogTitle } from "@headlessui/react";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import ModalWrapper from "./ModalWrapper";
import Textbox from "./Textbox";
import { useChangePasswordMutation } from "../redux/slices/api/userApiSlice";
import { toast } from "sonner";
import Loading from "./Loader";

const ChangePassword = ({open, setOpen}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [ChangeUserPassword, {isLoading}] = useChangePasswordMutation()

    const handleOnSubmit = async (data) => {
        if(data.password !== data.cpass) {
            toast.warning("Password doesn't match")
            return
        }
        try{
            const res = await ChangeUserPassword(data).unwrap()
            toast.success("New User added succesfully")

            setTimeout(() => {
                setOpen(false)
                window.location.reload();
            }, 500)
        } catch (err) {
            console.log(err)
            toast.error(err?.data?.message || err.error)
        }
    }

    return (
        <>
            <ModalWrapper open={open} setOpen={setOpen}>
                <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
                    <Dialog.Title 
                        as='h2'
                        classname='text-base font-bold leading-6 text-gray-900 mb-6'
                    >
                        Поменять пароль
                    </Dialog.Title>
                    <div classname='mt-2 flex flex-col gap-6'>
                        <Textbox
                            placeholder='Новый пароль'
                            type='password'
                            name='password'
                            label='Новый пароль'
                            classname='w-full rounded'
                            register={register("password", {
                                required: "Введите новый пароль!",
                            })}
                            error={errors.password ? errors.password.message : ""}
                        />
                        <Textbox
                            placeholder='Подтвердите новый пароль'
                            type='password'
                            name='cpass'
                            label='Подтвердите новый пароль'
                            classname='w-full rounded'
                            register={register("cpass", {
                                required: "Подтвердите новый пароль!",
                            })}
                            error={errors.cpass ? errors.cpass.message : ""}
                        />
                    </div>

                    {isLoading ? (
                        <div className='py-5'>
                            <Loading />
                        </div>
                    ) : (
                      <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
                        <Button
                          type='submit'
                          className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                          label='Сохранить'
                        />
          
                        <button
                          type='button'
                          className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                          onClick={() => setOpen(false)}
                        >
                            Отмена
                        </button>
                    </div>
                    )}
                    </form>
                    </ModalWrapper>
            </>
    )
}

export default ChangePassword