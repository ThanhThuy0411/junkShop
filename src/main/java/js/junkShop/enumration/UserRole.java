package js.junkShop.enumration;

public enum UserRole {
    Admin("admin",0),
    User("user",1);

    private final String key;
    private final Integer value;

    UserRole(String key, Integer value) {
        this.key = key;
        this.value = value;
    }


    public String getKey() {
        return key;
    }

    public Integer getValue() {
        return value;
    }
}
