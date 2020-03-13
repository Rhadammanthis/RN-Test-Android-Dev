package com.rntestandroiddev.firebase;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class FirebaseModule extends ReactContextBaseJavaModule {

    private ReactApplicationContext mReactContext;

    FirebaseModule(ReactApplicationContext context) {
        super(context);
        mReactContext = context;
    }
    
    // TODO: Ensure to make this method callable in Javascript!
    @ReactMethod
    public void testCrash() {
        throw new RuntimeException("Test Crash");
    }

    @Override
    public String getName() {
        return "FirebaseModule";
    }
}