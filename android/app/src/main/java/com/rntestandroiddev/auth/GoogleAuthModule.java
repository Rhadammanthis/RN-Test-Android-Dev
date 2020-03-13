package com.rntestandroiddev.auth;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;

import java.util.Locale;

public class GoogleAuthModule extends ReactContextBaseJavaModule {
    private static final String TAG = "GoogleAuthModule";
    private static final int SIGN_IN_REQ = 101;

    private ReactContext mContext;
    private Promise mSignInPromise;
    private GoogleSignInOptions mSignInOptions;

    GoogleAuthModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
        mContext.addActivityEventListener(new BaseActivityEventListener() {
            @Override
            public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
                if (requestCode != SIGN_IN_REQ) {
                    Log.d(TAG, "onActivityResult: Unknown request detected " + requestCode);
                    return;
                }

                handleSignInResult(data);
            }
        });

        // Initiate sign in options
        mSignInOptions = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestEmail()
            .build();
    }
    
    // TODO: Ensure to make this method callable in Javascript!
    @ReactMethod
    public void signIn(Promise promise) {
        mSignInPromise = promise;

        Activity activity = getCurrentActivity();
        // Ensure activity is present while logged in.
        if (activity == null) {
            Log.e(TAG, "signIn: Unable to sign in while app in background.");
            return;
        }
        // Check last signed-in info, when it present then return it.
        WritableMap lastSignedInInfo = getLastSignedInAccountInfo();
        if (lastSignedInInfo != null) {
            promise.resolve(lastSignedInInfo);
            return;
        }
        // Get sign-in intent and asking for a result
        Intent signInIntent = GoogleSignIn.getClient(mContext.getApplicationContext(), mSignInOptions)
                .getSignInIntent();
        activity.startActivityForResult(signInIntent, SIGN_IN_REQ);
    }

    // TODO: Ensure to make this method callable in Javascript!
    @ReactMethod
    public void signOut(final Promise promise) {
        GoogleSignIn.getClient(mContext.getApplicationContext(), mSignInOptions)
                .signOut()
                .addOnSuccessListener(new OnSuccessListener<Void>() {
                    @Override
                    public void onSuccess(Void aVoid) {
                        promise.resolve("Successfully sign out.");
                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        String errorCode = "SIGN_OUT_FAILED";
                        if (e instanceof ApiException) {
                            // The ApiException status code indicates the detailed failure reason.
                            // Please refer to the GoogleSignInStatusCodes class reference for more information.
                            errorCode = String.format(Locale.ENGLISH, "%s_%d", errorCode, ((ApiException) e).getStatusCode());
                        }
                        Log.e(TAG, "signOut:failed code=" + errorCode);
                        promise.reject(errorCode,"SIGNED_OUT_ERROR : " + e.getMessage());
                    }
                });
    }

    @NonNull
    @Override
    public String getName() {
        return "GoogleAuthModule";
    }

    private void handleSignInResult(Intent data) {
        GoogleSignIn.getSignedInAccountFromIntent(data)
                .addOnSuccessListener(new OnSuccessListener<GoogleSignInAccount>() {
                    @Override
                    public void onSuccess(GoogleSignInAccount googleSignInAccount) {
                        // Signed in successfully
                        Log.i(TAG, "handleSignInResult: Signed in success.");
                        WritableMap accountInfo = toWritableMap(googleSignInAccount);
                        mSignInPromise.resolve(accountInfo);
                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        String errorCode = "SIGN_IN_FAILED";
                        if (e instanceof ApiException) {
                            // The ApiException status code indicates the detailed failure reason.
                            // Please refer to the GoogleSignInStatusCodes class reference for more information.
                            errorCode = String.format(Locale.ENGLISH, "%s_%d", errorCode, ((ApiException) e).getStatusCode());
                        }
                        Log.e(TAG, "handleSignInResult:failed code=" + errorCode);
                        mSignInPromise.reject(errorCode,"SIGNED_IN_ERROR : " + e.getMessage());
                    }
                });
    }

    @Nullable
    private WritableMap getLastSignedInAccountInfo() {
        GoogleSignInAccount account = GoogleSignIn.getLastSignedInAccount(mContext.getApplicationContext());
        return toWritableMap(account);
    }

    @Nullable
    private WritableMap toWritableMap(@Nullable GoogleSignInAccount account) {
        if (account == null) {
            return null;
        }

        WritableMap map = Arguments.createMap();
        map.putString("name", account.getDisplayName());
        map.putString("email", account.getEmail());
        return map;
    }
}
