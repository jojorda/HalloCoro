package usersdto

type UserResponse struct {
	ID       int    `json:"id"`
	Name     string `gorm:"type: varchar(255)" json:"name"`
	Username string `gorm:"type: varchar(255)" json:"username"`
	Email    string `gorm:"type: varchar(255)" json:"email"`
	Password string `gorm:"type: varchar(255)" json:"password"`
	ListAs   string `gorm:"type: varchar(100)" json:"listAs"`
	Gender   string `gorm:"type: varchar(100)" json:"gender"`
	Phone    string `gorm:"type: varchar(100)" json:"phone"`
	Address  string `gorm:"type: text" json:"address"`
	// Image    string `gorm:"type: varchar(255)" json:"image"`
}

type ChangeImageResponse struct {
	Username string `gorm:"type: varchar(255)" json:"username"`
	Image string `json:"image" gorm:"type: varchar(255)"`
	Message string `json:"message"`
}