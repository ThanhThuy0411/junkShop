package js.junkShop.enumration;

public enum UserGender {
    Nam("nam",0),
    Nu("nu",1);

    private final String key;
    private final Integer value;

    UserGender(String key, Integer value) {
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
