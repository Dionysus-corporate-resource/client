1. border-[hsl(var(--border))]
Для темной темы, нужно дописывать это в компоненты
2. bg-[hsl(var(--sidebar-background))]
Это для фона в темной теме


<div className="w-full max-w-lg flex-1">
                  <form onSubmit={handleSubmit}>
                    <CardContent className="grid gap-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-1 col-span-2 gap-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="email"
                              className="flex items-center"
                            >
                              <CompassIcon className="mr-2 h-4 w-4" />
                              Название компании
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              name="email"
                              onChange={handleChange}
                              placeholder="лтк Дионис"
                              required
                            />
                            <div className="text-[0.8rem] text-muted-foreground">
                              Введите имя компании
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="userName"
                              className="flex items-center"
                            >
                              <UserIcon className="mr-2 h-4 w-4" />
                              Имя
                            </Label>
                            <Input
                              id="userName"
                              name="userName"
                              onChange={handleChange}
                              placeholder="Анатолий Палыч"
                              required
                            />
                            {/* <div className="text-[0.8rem] text-muted-foreground">
                              Имя Ген Директора
                            </div> */}
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="email"
                              className="flex items-center"
                            >
                              <MailIcon className="mr-2 h-4 w-4" />
                              Почта
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              name="email"
                              onChange={handleChange}
                              placeholder="m@example.com"
                              required
                            />
                            {/* <div className="text-[0.8rem] text-muted-foreground">
                              Почта Ген Директора
                            </div> */}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="password"
                              className="flex items-center"
                            >
                              <LockIcon className="mr-2 h-4 w-4" />
                              Пароль
                            </Label>
                            <Input
                              id="password"
                              type="password"
                              name="password"
                              onChange={handleChange}
                              placeholder="*********"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="phone"
                              className="flex items-center"
                            >
                              <PhoneIcon className="mr-2 h-4 w-4" />
                              Телефон
                            </Label>
                            <Input
                              id="phone"
                              type="tel"
                              name="phone"
                              required
                              onChange={handleChange}
                              placeholder="+8 (918) 555-5555"
                            />
                          </div>
                        </div>
                      </div>

                      <Button type="submit" className="w-full">
                        Зарегистрировать
                      </Button>
                    </CardContent>
                    <CardFooter className="flex flex-col items-center gap-4">
                      <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">
                            лтк Дионис
                          </span>
                        </div>
                      </div>
                    </CardFooter>
                  </form>

                  <CardFooter className="flex gap-2 justify-center">
                    Already have an account?
                    <NavLink to="/login">Sign in</NavLink>
                  </CardFooter>
                </div>
