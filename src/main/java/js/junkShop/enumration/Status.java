package js.junkShop.enumration;

public enum Status {
    stocking("Con hang",0),
    sold("Da ban",1);

    private final String key;
    private final Integer value;

    Status(String key, Integer value) {
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
